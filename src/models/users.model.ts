// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    pseudo: {type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true  },
    password: { type: String, required: true  },
    age: {type: Number, required: true },
    genre: {type: String, enum:['m','f','a']},
    rayonRecherche: {type: Number},
    position:{
      latitude: {type: Number},
      longitude: {type: Number},
    },
    typeRecherche: [String],
    role: {type: String, enum: ['jeune','adelphe','modo','admin']},
    bio: {type: String},
    visible: {type: Boolean},
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
