import TrainPart from "./TrainPart";

interface TrainInformation {
    trip_id: string;
    type: string;
    parts: TrainPart[];
}

export default TrainInformation;
