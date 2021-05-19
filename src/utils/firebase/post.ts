import { initializeApp, getApp, FirebaseApp } from 'firebase/app'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp
} from 'firebase/firestore'

import { getConfig } from './config'

let app: FirebaseApp
try {
  app = getApp()
} catch {
  app = initializeApp(getConfig())
}
const database = getFirestore(app)

interface PostSimple {
  name: string
  id: string
  image: string
}

interface FirestorePost {
  name: string
  date: Timestamp
  thumbnail: {
    originalWebp: string
    metaTag: string
    list: string
  }
  description: string
  content: string
  views: string[]
  id: string
}
interface Post {
  id: string
  name: string
  date: string
  thumbnail: string
  metaTag: string
  description: string
  content: string
  views: number
  preview: boolean
}
const postsCollection = collection(
  database,
  `apps/${process.env.NEXT_PUBLIC_ENV || process.env.NEXT_ENV}/postsOfBlog`
)
export async function getInitialPosts(): Promise<PostSimple[]> {
  const collectionSnapshot = await getDocs<FirestorePost>(
    query(postsCollection, orderBy('date', 'desc'), limit(10))
  )
  const posts = collectionSnapshot.docs.map(doc => {
    return {
      name: doc.data().name,
      image: doc.data().thumbnail.list,
      id: doc.id
    }
  })
  return posts
}

export async function getNextPosts(lastPostId: string): Promise<PostSimple[]> {
  const lastDocument = doc(postsCollection, lastPostId)
  const collectionSnapshot = await getDocs<FirestorePost>(
    query(
      postsCollection,
      orderBy('date', 'asc'),
      startAfter(lastDocument),
      limit(10)
    )
  )
  const newPosts = collectionSnapshot.docs.map(doc => {
    return {
      name: doc.data().name,
      image: doc.data().thumbnail.list,
      id: doc.id
    }
  })
  return newPosts
}
export async function getPost(postId: string): Promise<Post | null> {
  const documentSnapshot = await getDoc<FirestorePost>(
    doc(postsCollection, postId)
  )
  if (!documentSnapshot.exists()) return null
  const documentData = documentSnapshot.data()
  const dateObject = documentData.date.toDate()
  const date = `${dateObject.getDate()}/${
    dateObject.getMonth() + 1
  }/${dateObject.getFullYear()}`
  return {
    id: postId,
    name: documentData.name,
    content: documentData.content,
    thumbnail: documentData.thumbnail.originalWebp,
    metaTag: documentData.thumbnail.metaTag,
    date,
    description: documentData.description,
    views: documentData.views?.length || 0,
    preview: false
  }
}
