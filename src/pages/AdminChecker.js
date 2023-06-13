import React from "react";
import { useSelector } from "react-redux";
import Admin from "../admin/Admin";

export default function AdminChecker() {
  const isAdmin = useSelector((state) => state.bazar.isAdmin);

  return isAdmin ? <Admin /> : <h1>you are not admin!</h1>;
}
