import ListAdminPage from "@/components/ListAdminPage";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";
import { retriveIdToken } from "@/services/firebase/client/auth";
import {
  Post,
  deletePost,
  getAllPosts,
  updatePostVisible,
} from "@/services/firebase/client/posts";
import { parseYYYYMMDDtoDDMMYYYY } from "@/utils/parseDateStringtoDateObj";
import { useCallback, useMemo, useState } from "react";
import { TbEdit, TbEye, TbEyeOff, TbEyeglass2, TbTrash } from "react-icons/tb";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>();

  const loadPosts = useCallback(async () => {
    setPosts(await getAllPosts());
  }, []);

  const list = useMemo(() => {
    return posts?.map((post) => ({
      id: post.id,
      title: post.name,
      description: parseYYYYMMDDtoDDMMYYYY(post.date),
      image: post.thumbnail.list,
      blurImage: post.thumbnail.alt,
      altImage: post.thumbnail.alt,
    }));
  }, [posts]);

  const changeVisible = useCallback(
    async (postId: string) => {
      const post = posts?.find((post) => post.id === postId);
      if (!post) return;
      try {
        await updatePostVisible(postId, !post.visible);
        await revalidateNextPages("blog", postId);
        setPosts((posts) =>
          posts?.map((post) => {
            if (post.id === postId) return { ...post, visible: !post.visible };
            return post;
          })
        );
      } catch (err) {
        alert("Erro ao atualizar visibilidade do post");
        console.log(err);
      }
    },
    [posts]
  );

  const loadVisibleIcon = useCallback(
    (postId: string) => {
      const post = posts?.find((post) => post.id === postId)?.visible;
      if (!post) return TbEyeOff;
      return post ? TbEye : TbEyeOff;
    },
    [posts]
  );

  const handleDeleteClick = useCallback(async (postId: string) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    await deletePost(postId);
    await revalidateNextPages("blog", postId);
    setPosts((posts) => posts?.filter((post) => post.id !== postId));
  }, []);

  const handlePreviewClick = useCallback(async (postId: string) => {
    const idToken = await retriveIdToken();
    // set cookie
    document.cookie = `idToken=${idToken}; path=/`;
    return `/admin/blog/preview/${postId}`;
  }, []);

  return (
    <ListAdminPage
      addButtonClick={() => "/admin/blog/editor/new"}
      list={list}
      listButtons={[
        {
          icon: () => TbEdit,
          onClick: (id) => `/admin/blog/editor/${id}`,
          hideOnClicked: true,
        },
        {
          icon: () => TbTrash,
          onClick: handleDeleteClick,
        },
        {
          icon: () => TbEyeglass2,
          onClick: handlePreviewClick,
          hideOnClicked: true,
        },
        {
          icon: loadVisibleIcon,
          onClick: changeVisible,
        },
      ]}
      addButtonText="Novo Post"
      emptyListText="Nenhum post cadastrado"
      addButtonHideOnClicked
      title="Gerenciador de Posts do Blog"
      executeBeforeAuthenticated={loadPosts}
    />
  );
}
