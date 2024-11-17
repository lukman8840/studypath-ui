import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import { Main, Button, Input, Nav, Select } from "./app.style";
import { FaArrowUp } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { CircularProgressbar } from "react-circular-progressbar";
import List from "./List";
import Lottie from "lottie-react";
import loadingAnimation from "../src/assets/loading.json";
import Robot from "../src/assets/laptop.json";
import "react-toastify/dist/ReactToastify.css";
import { Topics } from "./common";
import { TypeAnimation } from "react-type-animation";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
const INITIAL_VALUES: Topics = {
  id: 0,
  title: "",
  isDone: false,
  link: "",
};

const TYPING_SEQUENCES = [
  "StudyPath: Your journey begins here!",
  1000,
  "Breaking down complex topics into simple steps.",
  1000,
  "Guiding you through each stage of your learning path.",
  1000,
  "Achieve your goals with personalized study guides.",
  1000,
];

interface LocalStorageService {
  storeTopics: (topics: Topics[]) => void;
  getTopics: () => Topics[] | null;
  clearTopics: () => void;
}

const localStorageService: LocalStorageService = {
  storeTopics: (topics: Topics[]) => {
    try {
      localStorage.setItem("items", JSON.stringify(topics));
    } catch (error) {
      console.error("Error storing items to localStorage", error);
    }
  },

  getTopics: () => {
    try {
      const items = localStorage.getItem("items");
      if (!items) return null;

      let parsedItems: Topics[] = JSON.parse(items);
      if (typeof parsedItems === "string") {
        parsedItems = JSON.parse(parsedItems);
      }
      return parsedItems;
    } catch (error) {
      console.error("Error retrieving items from localStorage", error);
      return null;
    }
  },

  clearTopics: () => {
    localStorage.removeItem("items");
  },
};

function App() {
  const [topics, setTopics] = useState<Topics[]>([]);
  const [topic, setTopic] = useState("");
  const [select, setSelect] = useState("Beginner"); // Set default value
  const [currentTopic, setCurrentTopic] = useState<Topics>(INITIAL_VALUES);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedTopics = localStorageService.getTopics();
    if (savedTopics) {
      setTopics(savedTopics);
    }
  }, []);

  const generateToc = useCallback(async () => {
    if (!topic || !select) {
      toast.info("Please provide a topic and level");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/learn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, level: select }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const responseJson = await response.json();
      localStorageService.storeTopics(responseJson.data.tasks);
      setTopics(responseJson.data.tasks);
      setTopic("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate topics");
    } finally {
      setLoading(false);
    }
  }, [topic, select]);

  const markAsDone = useCallback((id: number) => {
    setTopics((prevTopics) => {
      const updatedTopics = prevTopics.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item));
      localStorageService.storeTopics(updatedTopics);
      return updatedTopics;
    });
  }, []);

  const updateTopic = useCallback(() => {
    if (!currentTopic.title) {
      toast.info("Cannot clear a step to empty");
      return;
    }

    setTopics((prevTopics) => {
      const updatedTopics = prevTopics.map((item) =>
        item.id === currentTopic.id ? { ...item, title: currentTopic.title } : item
      );
      localStorageService.storeTopics(updatedTopics);
      return updatedTopics;
    });

    setEdit(false);
    setCurrentTopic(INITIAL_VALUES);
  }, [currentTopic]);

  const handleChangeText = useCallback(
    (value: string) => {
      if (edit) {
        setCurrentTopic((prev) => ({ ...prev, title: value }));
      } else {
        setTopic(value);
      }
    },
    [edit]
  );

  const deleteTopic = useCallback((id: number) => {
    setTopics((prevTopics) => {
      const filteredTopics = prevTopics.filter((item) => item.id !== id);
      localStorageService.storeTopics(filteredTopics);
      return filteredTopics;
    });
  }, []);

  const progress = useMemo(() => {
    const completedTopics = topics.filter((task) => task.isDone).length;
    return Math.floor((completedTopics / topics.length) * 100) || 0;
  }, [topics]);

  const renderContent = () => {
    if (loading) {
      return <Lottie animationData={loadingAnimation} style={{ height: "50vh" }} loop={true} />;
    }

    if (topics.length === 0) {
      return (
        <>
          <Lottie animationData={Robot} style={{ height: "50vh" }} loop={true} />
          <TypeAnimation
            sequence={TYPING_SEQUENCES}
            wrapper="span"
            speed={50}
            style={{ display: "inline-block" }}
            repeat={Infinity}
          />
        </>
      );
    }

    return (
      <List
        data={topics}
        deleteTopic={deleteTopic}
        markAsDone={markAsDone}
        setCurrentTopic={setCurrentTopic}
        setEdit={setEdit}
      />
    );
  };

  return (
    <>
      <Nav>
        <h4>StudyPath</h4>
      </Nav>

      <Main>
        <div className="header">
          <Input
            value={edit ? currentTopic.title : topic}
            onChange={(e) => handleChangeText(e.target.value)}
            type="text"
            placeholder="What do you want to learn"
          />
          <div className="select-container">
            <Select className="custom-select" value={select} onChange={(e) => setSelect(e.target.value)}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </Select>
          </div>

          <Button style={{ width: "40px" }} type="submit" onClick={edit ? updateTopic : generateToc}>
            {edit ? <ImCheckmark /> : <FaArrowUp />}
          </Button>
        </div>

        <div className="list">{renderContent()}</div>

        <div className="side">
          {!loading && topics.length > 0 && (
            <>
              <div style={{ width: "100px" }}>
                <CircularProgressbar value={progress} text={`${progress}%`} />
              </div>
              <p>Track your progress</p>
            </>
          )}
          {!loading && topics.length === 0 && <p>Your Guided Journey to Mastery</p>}
        </div>
      </Main>
    </>
  );
}

export default App;
