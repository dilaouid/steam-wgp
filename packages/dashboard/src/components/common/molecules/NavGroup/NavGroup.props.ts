import { ReactNode } from "react"

export interface NavGroupProps {
    title?: string
    children: ReactNode
    collapsed?: boolean
}  