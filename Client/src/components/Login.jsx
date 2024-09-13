import { Box, Input, Button, FormControl, FormLabel, VStack, Heading, Text, useToast, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      }, { withCredentials: true });

      if (response.data.success) {
        toast({ title: "Login successful.", status: "success", duration: 3000 });
        navigate("/home");
      }
    } catch (error) {
      toast({
        title: error.response?.status === 401 ? "Invalid username or password" : "Login failed.",
        status: "error",
        duration: 3000
      });
    }
  };

  const handleGoogleOAuth = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <Box bgGradient="linear(to-r, teal.500, green.500)" h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box bg="gray.800" p={8} rounded="lg" shadow="lg" maxW="400px" w="100%">
        <Heading mb={6} textAlign="center" fontSize="2xl" fontWeight="bold">
          Login
        </Heading>

        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel fontWeight="bold" color="teal.600">Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              focusBorderColor="teal.400"
              shadow="sm"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel fontWeight="bold" color="teal.600">Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              focusBorderColor="teal.400"
              shadow="sm"
            />
          </FormControl>

          <Button colorScheme="teal" w="100%" onClick={handleLogin}>
            Login
          </Button>

          <Divider />

          <Button colorScheme="blue" w="100%" variant="outline" onClick={handleGoogleOAuth}>
            Login with Google
          </Button>

          <Text fontSize="sm" color="gray.500" mt={3}>
            Don't have an account?{" "}
            <Button variant="link" colorScheme="teal" onClick={() => navigate("/register")}>
              Register
            </Button>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default Login;



// import { useState } from "react";
// import { Box, Input, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const toast = useToast();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/login", {
//         username,
//         password,
//       }, { withCredentials: true });

//       if (response.data.success) {
//         toast({ title: "Login successful.", status: "success" });
//         navigate("/home"); // Redirect to home page
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         toast({ title: "Invalid username or password", status: "error" });
//       } else {
//         toast({ title: "Login failed.", description: error.message, status: "error" });
//       }
//     }
//   };

//   const handleGoogleOAuth = () => {
//     window.location.href = "http://localhost:3000/auth/google";
//   };

//   return (
//     <Box p={8}>
//       <FormControl>
//         <FormLabel>Username</FormLabel>
//         <Input value={username} onChange={(e) => setUsername(e.target.value)} />
//       </FormControl>
//       <FormControl mt={4}>
//         <FormLabel>Password</FormLabel>
//         <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </FormControl>
//       <Button mt={4} onClick={handleLogin}>Login</Button>

//       <Button mt={4} colorScheme="blue" onClick={handleGoogleOAuth}>
//         Login with Google
//       </Button>

//       <Button mt={4} variant="link" onClick={() => navigate("/register")}>
//         Do not have an account? Register
//       </Button>
//     </Box>
//   );
// }

// export default Login;
