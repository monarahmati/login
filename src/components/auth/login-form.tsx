import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import logoImg from "../../assets/images/logos/fava.svg";
import * as yup from "yup";
import { loginConfig } from "../../config/features/auth/auth-config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";




const loginForm = () => {



  //PASSWORD_STATE
  const [showPasword, setShowPassword] = useState(false);

  //TOGGLE_SEE_PASSWORD
  const toggleSeePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

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
                error={!!errors[loginConfig.username]}
                helperText={
                  (errors[loginConfig.username]?.message || "") as any
                }
                fullWidth
                autoComplete="off"
              />

              <TextField
                id="password-input"
                label="رمز ورود"
                variant="outlined"
                {...register(loginConfig.password)}
                error={!!errors[loginConfig.password]}
                helperText={
                  (errors[loginConfig.password]?.message || "") as any
                }
                fullWidth
                type={showPasword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleSeePassword}>
                        {
                            showPasword ? ( <RemoveRedEyeIcon/> ) : (<VisibilityOffIcon/> )
                        }
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="off"
              />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default loginForm;
