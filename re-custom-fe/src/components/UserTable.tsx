import React from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material"
import type { User } from "../types/User"

interface UserTableProps {
    users: User[]
    onEdit: (user: User) => void
    onDelete: (id: number) => void
    onFetchActivities: (id: number) => void
    onDownloadPdf: (id: number) => void
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete, onFetchActivities, onDownloadPdf }) => {

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Downloads</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && users.map((user: any) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.downloads || 0}</TableCell>
                            <TableCell>
                                <Button onClick={() => onEdit(user)}>Edit</Button>
                                <Button onClick={() => onDelete(user.id)}>Delete</Button>
                                <Button onClick={() => onFetchActivities(user.id)}>View Activities</Button>
                                <Button onClick={() => onDownloadPdf(user.id)}>Download PDF</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserTable
