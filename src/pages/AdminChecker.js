import React from "react";
import { useSelector } from "react-redux";
import Admin from "../admin/Admin";

export default function AdminChecker() {
  const isAdmin = useSelector((state) => state.bazar.isAdmin);

  return isAdmin ? (
    <Admin />
  ) : (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl text-red-500">!You are not an admin</h1>
    </div>
  );}
