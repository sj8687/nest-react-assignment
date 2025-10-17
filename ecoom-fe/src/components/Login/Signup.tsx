import { useState } from "react";
import axios from "axios";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3000/auth/signup`, {
                email,
                password,
            },
                { withCredentials: true }

            );

            console.log("Login success", response.data);
            toast.success("Logged in successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 ">
            <Card className="p-8 w-full max-w-md relative">
                <button
                    onClick={() => Navigate("/shop")}
                    className="absolute top-4 right-4 text-black hover:text-black text-lg"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" className="bg-black text-white cursor-pointer" >
                        Login
                    </Button>
                </form>
            </Card>
        </div>
    );
}
