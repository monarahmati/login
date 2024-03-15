import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import logoImg from "../../assets/images/logos/fava.svg";
import * as yup from "yup";
import { loginConfig } from "../../config/features/auth/auth-config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "api/auth/auth-api";
import userStore from "hooks/store/user-store";
import { useNavigate } from "react-router-dom";
import { stat } from "fs";




const loginForm = () => {



  //PASSWORD_STATE
  const [showPasword, setShowPassword] = useState(false);
  //SUBMIT_STATE
  const [rememberMe, setRememberMe] = useState(true);
  //USE_STORE
  const chnageUserData = userStore((state) => state.chnageUserData )
  //USE_NAVIGATE
  const navigate = useNavigate()



  const loginMutation = useMutation( AuthApi.login , {
    onSuccess: (data) => {
      if( data.data){
        chnageUserData({
          id: data.data.id,
          firstName: data.data.firstName,
          userName: data.data.userName,
          lastName: data.data.lastName,
          bio: data.data.bio,
          permissions: data.data.lisence,
          nowDate: data.data.dateNow,
        });
        if (rememberMe) {
          localStorage.setItem("token-auth", data.data.token);
        }
        navigate("/welcome")
      } else {
        const message = "نام کاربری یا رمز ورود اشتباه است";
        setError(loginConfig.username, { message });
        setError(loginConfig.password, { message });

      }
    }
  } )





  //TOGGLE_SEE_PASSWORD
  const toggleSeePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  //REQUIRED-WITH-YUP
  const loginFormSchema = yup.object({
    [loginConfig.username]: yup.string().required(),
    [loginConfig.password]: yup.string().required().min(6),
  });


  //USE_REACTE_HOOK_FORM
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm({ resolver: yupResolver(loginFormSchema) });

  //HANDLEsubmit 
  const onSubmitHandler = ( values : any ) => {
    loginMutation.mutate(values)
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
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

              <FormGroup>
                <FormControlLabel
                    control={
                      <Checkbox
                       checked={rememberMe}
                       onChange={ () => setRememberMe((state) => !state )}
                      />
                    }
                    label = {
                      <Typography variant="body2"> مرا به خاطر بسپار </Typography>
                    }
                />
              </FormGroup>
            </Stack>

            
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default loginForm;
