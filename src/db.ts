import mongoose from 'mongoose';

// Mình không dùng dotenv mà để luôn link mongo ở đây sẵn cho thầy test code nhé.
const uri =
  'mongodb+srv://mindx:mindx@mindx.tfvhoaf.mongodb.net/?retryWrites=true&w=majority&appName=mindx';

const clientOptions = {
  serverApi: { version: '1' as const, strict: true, deprecationErrors: true },
};

export const db = {
  mongoose,
  connect: async () => {
    console.log('Connecting to MongoDB ...');
    try {
      await mongoose.connect(uri, clientOptions);
      await mongoose.connection.db?.admin().command({ ping: 1 });
      console.log('You successfully connected to MongoDB!');
    } catch (e) {
      throw new Error('Error connect to MongoDB: ' + e);
    }
    return mongoose;
  },
};

export type DB = typeof db;
