import { SetStateAction, useEffect, useState } from 'react';
import './App.css';
import { Main, Button, Input, Nav, Select } from './app.style';
import { FaArrowUp } from 'react-icons/fa';
import { ImCheckmark } from 'react-icons/im';
import { CircularProgressbar } from 'react-circular-progressbar';
import List from './List';
import Lottie from 'lottie-react';
import loadingAnimation from '../src/assets/loading.json';

export interface Topics {
  id: number;
  title: string;
  isDone: boolean;
  link: string;
}
const initialValues = {
  id: 0,
  title: '',
  isDone: false,
  link: '',
};

function App() {
  const [topics, setTopics] = useState<Topics[]>([]);
  const [topic, setTopic] = useState('');
  const [select, setSelect] = useState('');
  const [currentTopic, setCurrentTopic] = useState<Topics>(initialValues);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateToc = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/learn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          level: select,
        }),
      });

      if (!response.ok) {
        setLoading(false);
        setError(response.statusText);
        setError('');

        console.log('NOT OK::', response);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const parsedTopics = JSON.parse(data.text);
      setTopics(parsedTopics);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('There was a problem with the fetch operation', error);
    }
  };

  const markAsDone = (id: number) => {
    const updatedValues = topics.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone };
      } else {
        return item;
      }
    });

    setTopics(updatedValues);
  };

  const updateTopic = () => {
    const updatedValues = topics.map((item) => {
      if (item.id === currentTopic.id) {
        return { ...item, title: currentTopic.title };
      } else {
        return item;
      }
    });
    setTopics(updatedValues);
    setEdit(false);
    setCurrentTopic(initialValues);
  };
  const handleChangeText = (value: string) => {
    if (edit) {
      return setCurrentTopic({ ...currentTopic, title: value });
    }
    setTopic(value);
  };
  const deleteTopic = (id: number) => {
    const filteredTodo = topics.filter((item) => item.id !== id);
    setTopics(filteredTodo);
  };

  const completedTopics = topics.filter((task) => task.isDone).length;
  const totalTopics = topics.length;
  const progress = Math.floor((completedTopics / totalTopics) * 100);

  const handleSelectChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelect(event.target.value);
  };

  useEffect(() => {
    if (error !== '') {
      alert(error);
    }
  }, [error]);

  return (
    <>
      <Nav>
        <h4>StudyPath </h4>
      </Nav>

      <Main>
        <div className='header'>
          <Input
            value={edit ? currentTopic.title : topic}
            onChange={(e) => handleChangeText(e.target.value)}
            type='text'
            placeholder='What do u want to learn'
          />
          <div className='select-container'>
            <Select className='custom-select' onChange={handleSelectChange}>
              <option value='Beginner'>Beginner</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Advanced'>Advanced</option>
            </Select>
          </div>

          <Button
            style={{
              width: '40px',
            }}
            type='submit'
            onClick={edit ? updateTopic : generateToc}
          >
            {edit ? <ImCheckmark /> : <FaArrowUp />}
          </Button>
        </div>
        <div className='list'>
          {loading ? (
            <>
              <Lottie
                animationData={loadingAnimation}
                style={{ height: '50vh' }}
                loop={true}
              />
            </>
          ) : (
            <List
              data={topics}
              deleteTopic={deleteTopic}
              markAsDone={markAsDone}
              setCurrentTopic={setCurrentTopic}
              setEdit={setEdit}
            />
          )}
        </div>

        <div className='side'>
          {!loading && totalTopics > 0 ? (
            <div style={{ width: '100px' }}>
              <CircularProgressbar value={progress} text={`${progress}%`} />
            </div>
          ) : null}

          {!loading && totalTopics > 0 ? (
            <p>Track your progress</p>
          ) : (
            <p>Your Guided Journey to Mastery </p>
          )}
        </div>
      </Main>
    </>
  );
}

export default App;
