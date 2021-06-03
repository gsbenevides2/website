import firebaseAdmin from '../utils/firebaseAdmin'

export async function viewerCounter(
  viewerId: string,
  viewersIds: string[],
  postId: string
): Promise<number> {
  if (viewersIds.includes(viewerId)) {
    return viewersIds.length
  } else {
    await firebaseAdmin
      .firestore()
      .doc(`apps/${process.env.NEXT_ENV}/postsOfBlog/${postId}`)
      .update({
        views: firebaseAdmin.firestore.FieldValue.arrayUnion(viewerId)
      })
    return viewersIds.length + 1
  }
}
