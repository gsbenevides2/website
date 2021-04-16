import { NextApiHandler } from 'next'

import firebaseAdmin from '../../utils/firebaseAdmin'

const putHandler: NextApiHandler = (request, response) => {
  const { postId, userId } = request.query
  const invalidQuerys = []
  if (postId === undefined) invalidQuerys.push('postId')
  if (userId === undefined) invalidQuerys.push('userId')
  if (invalidQuerys.length !== 0) {
    response.status(400)
    response.end('Invalid query:' + invalidQuerys.join(','))
  } else {
    const firestorePostDocument = firebaseAdmin
      .firestore()
      .doc(`postsOfBlog/${postId}`)
    firestorePostDocument
      .get()
      .then(documentSnapshot => {
        const views = documentSnapshot.data().views as string[]
        if (views.includes(userId as string)) {
          response.json({
            successCode: 2,
            message: 'You have seen this post.'
          })
        } else {
          return firestorePostDocument.update({
            views: firebaseAdmin.firestore.FieldValue.arrayUnion(userId)
          })
        }
      })
      .then(() => {
        response.json({
          successCode: 1,
          message: 'View accounted.'
        })
      })
      .catch(() => {
        response.status(500)
        response.end('Error processing your request, please try again later.')
      })
  }
}
const handler: NextApiHandler = (request, response) => {
  if (request.method === 'PUT') {
    putHandler(request, response)
  } else {
    response.status(405)
    response.setHeader('Allow', 'PUT')
    response.end('Method Not Allowed')
  }
}
export default handler
