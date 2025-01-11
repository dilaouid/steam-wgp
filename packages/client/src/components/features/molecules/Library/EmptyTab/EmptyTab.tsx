import React from "react"
import { TbMoodEmptyFilled } from "react-icons/tb"

import { EmptyTabProps } from "."

export const EmptyTab: React.FC<EmptyTabProps> = ({ children }) => {
    return (
    <>
        <TbMoodEmptyFilled className="text-warning" style={{ fontSize: '3vw' }} />
        <p className="text-center text-warning fw-bold">{ children }</p>
    </>)
}