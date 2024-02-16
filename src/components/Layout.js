import { Outlet, useNavigate } from "react-router-dom";
import styles from '../css/Layout.module.css';
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { svgList } from "../assets/svg";
import React from "react";
import { BsGrid } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { setToken } from "../store/modules/user";
import { useAppDispatch } from "store";
import axios from "axios";

const Layout = (props) => {
  const head = props.head;

  return (
    <div>
      <div>
        {head && <header>
          헤더부분 입니다 !!이부분 수정하기!!
        </header>}

        {/* main쪽은 건들지 X */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;