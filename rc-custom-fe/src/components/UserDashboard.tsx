import React, { useState, useEffect } from "react"
import { Container, Typography, Paper, Button } from "@mui/material"
import ActivityChart from "./ActivityChart.tsx"
import type { User } from "../types/User.ts"
import type { Activity } from "../types/Activity.ts"
import {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    fetchUserActivities,
    downloadPdf,
} from "../api/api.ts"
import UserForm from "./UserForm.tsx"
import UserTable from "./UserTable.tsx"

const UserDashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])
    const [activities, setActivities] = useState<Activity[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [editUser, setEditUser] = useState<User | null>(null)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        const fetchedUsers = await fetchUsers()
        setUsers(fetchedUsers)
    }

    const handleCreateUser = async (user: User) => {
        await createUser(user)
        setEditUser(null) // Reset edit mode after user creation
        loadUsers()
    }

    const handleUpdateUser = async (id: number, user: User) => {
        const updatedUser = {
            email: user.email,
            id: user.id,
            name: user.name,
            role: user.role
        }
        await updateUser(id, updatedUser)
        setEditUser(null) // Reset edit mode after user update
        loadUsers()
    }

    const handleDeleteUser = async (id: number) => {
        await deleteUser(id)
        loadUsers()
    }

    const handleFetchActivities = async (userId: number) => {
        const fetchedActivities = await fetchUserActivities(userId)
        setActivities(fetchedActivities)
        const user = users.find((u) => u.id === userId)
        setSelectedUser(user || null)
    }

    const handleDownloadPdf = async (userId: number) => {
        await downloadPdf(userId)
        loadUsers()
        handleFetchActivities(userId)
    }

    const handleEditUser = (user: User) => {
        setEditUser(user)
    }

    const handleCancelEdit = () => {
        setEditUser(null)
    }

    const handleSubmitUserForm = async (user: User) => {
        if (editUser) {
            await handleUpdateUser(editUser.id as number, user)
        } else {
            await handleCreateUser(user)
        }
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                User Metrics Dashboard
            </Typography>
            <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
                <UserForm
                    onSubmit={handleSubmitUserForm}
                    initialValues={editUser || undefined}
                    isEditMode={!!editUser}
                />
                {editUser && (
                    <Button variant="contained" onClick={handleCancelEdit} style={{ margin: "10px", display: "flex", marginLeft: "25px" }}>
                        Cancel
                    </Button>
                )}
            </Paper>
            <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
                <UserTable
                    users={users}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                    onFetchActivities={handleFetchActivities}
                    onDownloadPdf={handleDownloadPdf}
                />
            </Paper>
            {selectedUser && (
                <Paper elevation={3} style={{ padding: "20px" }}>
                    <Typography variant="h6" gutterBottom>
                        Activities for {selectedUser.name}
                    </Typography>
                    <ActivityChart activities={activities} />
                </Paper>
            )}
        </Container>
    )
}

export default UserDashboard
