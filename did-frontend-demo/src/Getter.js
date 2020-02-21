import React, { useState, useEffect } from 'react';
import { Form, Input, Grid, Button, TextArea } from 'semantic-ui-react';
import axios from 'axios';

function Main (props) {
  const [contractContentValue, setContractContentValue] = useState(undefined);
  const [url, setUrl] = useState('');
  const [get, setGet] = useState(false);

  // empty array as second argument equivalent to componentDidMount
  async function getContent (url) {
    console.log(`http://localhost:9000/${url}`);
    const response = await axios.get(`http://localhost:9000/${url}`);
    console.log(response);
    setContractContentValue(response.data);
    setGet(false);
    console.log(contractContentValue);
  }
  useEffect(() => {
    if(get) {
        getContent(url);
    } else {
        setContractContentValue(contractContentValue)
    }
  }, [url, get, contractContentValue]);

  return (
    <Grid.Column>
      <h1>Contract Content Getter</h1>
      <Form>
        <Form.Field>
          <Input
            type='text'
            id='new_value'
            state='newValue'
            label='Contract Content Id'
            onChange={(_, { value }) => setUrl(`files/${value}`)}
          />
        </Form.Field>
        <Form.Field>
          <Button
            primary
            style={null}
            type='submit'
            onClick={ () => setGet(true)}
          >
            Get Contract Content
          </Button>
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
      <TextArea
      style={{width: "1000px", height: "500px"}}
      value={contractContentValue}>
      </TextArea>
    </Grid.Column>
  );
}

export default function Getter (props) {
  return (<Main {...props} />);
}
