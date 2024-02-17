import { useEffect, useState } from "react";
import Input from "../ui/input/Input";
import { Button } from "../ui/button/Button";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

const url = import.meta.env.VITE_JAVA_URL;

interface Todos {
  _id: number;
  title: string;
}

export const Todo = () => {
  const [value, setValue] = useState<Todos[]>([]);
  const [title, setTitle] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [isEdit, setIsEdit] = useState<number>(0);
  //  const [boolean, setBoolean] = useState<boolean>(false)

  const postUsers = async () => {
    if (title.trim() === "" && title.trim() === "") return;
    const newData = {
      title: title,
    };
    setTitle("");

    try {
      const response = (await axios.post(url, newData)).data;
      console.log("post jonotyy users", response);

      setValue([...response]);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUsers = async (id: number) => {
    try {
      const response = (await axios.delete(`${url}/${id}`)).data;
      console.log("delete users", response);

      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const patchUsers = async (id: number) => {
    const patchData = {
      title: nameInput,
    };
    const response = (await axios.patch(`${url}/${id}`, patchData)).data;
    setValue(response);
    getUsers();
    setIsEdit(0);
  };

  const getUsers = async () => {
    try {
      const response = (await axios.get(url)).data;
      console.log("get aluu user", response);

      setValue([...response]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Container>
      <Input type="text" value={title} setData={setTitle} />
      <Button onClick={postUsers}>add</Button>
      <div>
        {value.map((item) => (
          <div key={item._id}>
            {isEdit === item._id ? (
              <>
                <Input type="text" value={nameInput} setData={setNameInput} />
                <Button onClick={() => patchUsers(item._id)}>update</Button>
                <Button onClick={() => setIsEdit(0)}>cancel</Button>
              </>
            ) : (
              <>
                <p>{item.title}</p>
                <Button onClick={() => deleteUsers(item._id)}>delete</Button>
                <Button
                  onClick={() => {
                    setIsEdit(item._id);
                    setNameInput(item.title);
                  }}
                >
                  edit
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};
