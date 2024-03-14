import React from "react";

export interface TaskInterface {
    id?: number,
    title: string,
    description: string,
    status?: string,
    due_date: string
}
