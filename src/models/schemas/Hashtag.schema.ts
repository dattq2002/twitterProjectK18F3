import { ObjectId } from 'mongodb'

interface HashtagType {
  _id?: ObjectId
  name: string
  created_at?: Date
}

export default class Hashtag {
  _id?: ObjectId
  name: string
  created_at: Date

  constructor(data: HashtagType) {
    this._id = data._id || new ObjectId() // bình thường k có giá trị mặc định này
    this.name = data.name
    this.created_at = data.created_at || new Date()
  }
}
//vì: nếu dùng insertOne thì _id sẽ tự tạo, ta k cần giá trị mặc định
//nhưng tý nữa ta sẽ dùng findOneAndUpdate, và nó k tự có nên ta phải tạo giá trị mặc định _id
