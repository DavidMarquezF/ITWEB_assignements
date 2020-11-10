import {Exercise} from "./exercise.model";

export interface Workout {
    _id: string;
    name: string;
    description: string;
    exercises: Exercise[];
}
