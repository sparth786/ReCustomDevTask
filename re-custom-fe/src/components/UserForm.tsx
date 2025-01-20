import React, { useState, useEffect } from "react"
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material"
import type { User } from "../types/User"

interface UserFormProps {
    onSubmit: (user: User) => void
    initialValues?: User
    isEditMode?: boolean
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialValues, isEditMode = false }) => {
    const [user, setUser] = useState<User>(initialValues || { name: "", email: "", role: "User" })

    useEffect(() => {
        if (initialValues) {
            setUser(initialValues)
        } else {
            setUser({ name: "", email: "", role: "User" }) // Reset to default values when no initialValues
        }
    }, [initialValues])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target
        setUser((prevUser) => ({ ...prevUser, [name!]: value }))
    }

    const handleRoleChange = (e: SelectChangeEvent<string>) => {
        setUser((prevUser) => ({ ...prevUser, role: e.target.value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(user)
        setUser({ name: "", email: "", role: "User" })  // Clear form fields after submission
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required>
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={user.role}
                            onChange={handleRoleChange}
                            label="Role"
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="User">User</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        {isEditMode ? "Save Changes" : "Add User"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default UserForm
