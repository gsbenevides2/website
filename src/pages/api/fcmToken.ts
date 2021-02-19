import { NextApiRequest, NextApiResponse } from 'next'
import firebaseAdmin from '../../utils/firebaseAdmin'

const fcmTokensDocument = firebaseAdmin.firestore().doc('others/fcm')
interface FunctionReturn {
  statusCode: number
  message: string
}
async function saveToken(token: string): Promise<FunctionReturn> {
  try {
    await fcmTokensDocument.set(
      { blogTokens: firebaseAdmin.firestore.FieldValue.arrayUnion(token) },
      { merge: true }
    )
    return {
      statusCode: 200,
      message: 'Token saved.'
    }
  } catch (e) {
    return {
      statusCode: 500,
      message: 'Error saving token.'
    }
  }
}

async function deleteToken(token: string): Promise<FunctionReturn> {
  try {
    await fcmTokensDocument.set(
      { blogTokens: firebaseAdmin.firestore.FieldValue.arrayRemove(token) },
      { merge: true }
    )
    return {
      statusCode: 200,
      message: 'Token deleted.'
    }
  } catch (e) {
    return {
      statusCode: 500,
      message: 'Error saving token.'
    }
  }
}

async function tokenIsSaved(token: string): Promise<FunctionReturn> {
  try {
    const documentSnapshot = await fcmTokensDocument.get()
    const tokens = documentSnapshot.data().blogTokens as string[]
    if (tokens.includes(token)) {
      return {
        statusCode: 200,
        message: 'Token found.'
      }
    } else {
      return {
        statusCode: 404,
        message: 'Token not found.'
      }
    }
  } catch (e) {
    return {
      statusCode: 500,
      message: 'Error saving token.'
    }
  }
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const token = request.query.token as string | null
  if (!token) {
    response.status(404).end("Query param 'token' is required")
    return
  }
  if (request.method === 'POST') {
    const { statusCode, message } = await saveToken(token)
    response.status(statusCode).json({ message })
  } else if (request.method === 'DELETE') {
    const { statusCode, message } = await deleteToken(token)
    response.status(statusCode).json({ message })
  } else if (request.method === 'GET') {
    const { statusCode, message } = await tokenIsSaved(token)
    response.status(statusCode).send({ message })
  } else {
    response.setHeader('Allow', ['GET', 'POSTT', 'DELETE'])
    response.status(405).end(`Method ${request.method} Not Allowed `)
  }
}
