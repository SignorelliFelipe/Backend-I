import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/backend");

        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error al conectar con MongoDB:", error);
        process.exit(1);
    }
};