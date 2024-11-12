import mongoose from "mongoose"

const medicalRecordSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    previousDiseases: {
        type: [String],
        required: true,
    },
    CurrentAllotedDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    previousDoctorAlloted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    previousHospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
        default: "NA"
    }
}, {timestamps:true})

export const MedicalRecords = mongoose.model('MedicalRecord', medicalRecordSchema)