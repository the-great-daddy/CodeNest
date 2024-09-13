import { Box, Input, Button, FormControl, FormLabel, VStack, Heading, Text, useToast, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        name,
        username,
        email,
        password,
      });

      if (response.data.success) {
        toast({ title: "Registration successful!", status: "success", duration: 3000 });
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: error.response?.status === 409 ? "User already exists!" : "Registration failed.",
        status: "error",
        duration: 3000
      });
    }
  };

  const handleGoogleOAuth = async () => {
    // window.location.href = "http://localhost:3000/auth/google";
    try {
      const response = await axios.get("http://localhost:3000/auth/google", {
        withCredentials: true,
      });
      // console.log(response);
      if (response.data.success) {
        toast({ title: "Registration successful!", status: "success", duration: 3000 });
        navigate("/login");
      }
    } catch (error) { 
      toast({
        title: error.response?.status === 409 ? "User already exists!" : "Registration failed.",
        status: "error",
        duration: 3000
      });
    }
  };

  return (
    <Box bgGradient="linear(to-r, teal.500, green.500)" h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box bg="gray.800" p={8} rounded="lg" shadow="lg" maxW="400px" w="100%" textAlign="center">
        <Heading mb={6} textAlign="center" fontSize="2xl" fontWeight="bold">
          Register
        </Heading>

        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel fontWeight="bold" color="teal.600">Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              focusBorderColor="teal.400"
              shadow="sm"
            />
          </FormControl>

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

          <FormControl id="email" isRequired>
            <FormLabel fontWeight="bold" color="teal.600">Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <Button colorScheme="teal" w="100%" onClick={handleRegister}>
            Register
          </Button>

          <Divider />

          <Button colorScheme="blue" w="100%" variant="outline" onClick={handleGoogleOAuth}>
            Register with Google
          </Button>

          <Text fontSize="sm" color="gray.500" mt={3}>
            Already have an account?{" "}
            <Button variant="link" colorScheme="teal" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}


// import { useState } from "react";
// import { Box, Input, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
// import axios from "axios";

// function Register() {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const toast = useToast();

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/register", {
//         name,
//         username,
//         email,
//         password,
//       });

//       if (response.data.success) {
//         toast({ title: "User registered successfully.", status: "success" });
//         window.location.href = "/login";
//       }
//     } catch (error) {
//       if (error.response && error.response.data.message === "User already registered") {
//         toast({ title: "User already registered. Try logging in.", status: "error" });
//         window.location.href = "/login";
//       } else {
//         toast({ title: "Registration failed.", description: error.message, status: "error" });
//       }
//     }
//   };

//   const handleGoogleOAuth = () => {
//     window.location.href = "http://localhost:3000/auth/google";
//   };

//   return (
//     <Box p={8}>
//       <FormControl>
//         <FormLabel>Name</FormLabel>
//         <Input value={name} onChange={(e) => setName(e.target.value)} />
//       </FormControl>
//       <FormControl mt={4}>
//         <FormLabel>Username</FormLabel>
//         <Input value={username} onChange={(e) => setUsername(e.target.value)} />
//       </FormControl>
//       <FormControl mt={4}>
//         <FormLabel>Email</FormLabel>
//         <Input value={email} onChange={(e) => setEmail(e.target.value)} />
//       </FormControl>
//       <FormControl mt={4}>
//         <FormLabel>Password</FormLabel>
//         <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </FormControl>
//       <Button mt={4} onClick={handleRegister}>Register</Button>
      
//       <Button mt={4} colorScheme="blue" onClick={handleGoogleOAuth}>
//         Register with Google
//       </Button>
//     </Box>
//   );
// }

// export default Register;



// import { useState } from "react";
// import { Box, Input, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
// import axios from "axios";

// function Register() {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const toast = useToast();

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/register", {
//         name,
//         username,
//         email,
//         password,
//       });

//       if (response.data.success) {
//         toast({ title: "User registered successfully.", status: "success" });
//         // Redirect to login page after successful registration
//         window.location.href = "/login";
//       }
//     } catch (error) {
//       // Handle duplicate username or registration errors
//       if (error.response && error.response.data.message === "User already registered") {
//         toast({ title: "User already registered. Try logging in.", status: "error" });
//         window.location.href = "/login";
//       } else {
//         toast({ title: "Registration failed.", description: error.message, status: "error" });
//       }
//     }
//   };

//   return (
//     <Box p={8}>
//       <FormControl>
//         <FormLabel>Name</FormLabel>
//         <Input value={name} onChange={(e) => setName(e.target.value)} />
//       </FormControl>
//       <FormControl mt={4}>
//         <FormLabel>Username</FormLabel>
//         <Input value={username} onChange={(e) => setUsername(e.target.value)} />
//       </FormControl>
//       <FormControl mt={4}>
//         <FormLabel>Email</FormLabel>
//         <Input value={email} onChange={(e) => setEmail(e.target.value)} />
//       </FormControl>
//       <FormControl mt={4}>
//         <FormLabel>Password</FormLabel>
//         <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </FormControl>
//       <Button mt={4} onClick={handleRegister}>Register</Button>
//     </Box>
//   );
// }

// export default Register;
