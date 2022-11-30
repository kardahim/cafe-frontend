import { Dispatch, SetStateAction } from "react";

export interface ReservationDrawerInterface {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}