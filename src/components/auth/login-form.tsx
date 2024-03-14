import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logoImg from "../../assets/images/logos/fava.svg";
import userStore from "hooks/store/user-store";
import FixedModal from "components/ui/modal/fixed-modal";
import ForgetPasswordModal from "components/auth/forget-password-modal";
import * as yup from "yup";
import { useState } from "react";
import { loginConfig } from "../../config/features/auth/auth-config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "api/auth/auth-api";
import { error } from "console";
// import { enqueueSnackbar } from "notistack";
// import { globalConfig } from "config/global-config";

const loginForm = () => {
  //REQUIRED-WITH-YUP
  const loginFormSchema = yup.object({
    [loginConfig.username]: yup.string().required(),
    [loginConfig.password]: yup.string().required().min(6),
  });

  const {
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormSchema) });

  return (
    <>
      <Box
        component="form"
        paddingLeft={5}
        paddingRight={5}
        textAlign="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box>
          <Box
            component="img"
            sx={{
              width: "100%",
              mb: "40px !important",
            }}
            alt="fava-ahvaz"
            src={logoImg}
          />
        </Box>
        <Box>
          <Stack spacing={3}>
            <Stack spacing={2}>
              <TextField
                id="username-input"
                label="نام کاربری"
                variant="outlined"
                {...register(loginConfig.username)}
                error={!!errors[loginConfig.username] }
                helperText={(errors[loginConfig.username]?.message || "") as any }
              />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default loginForm;
