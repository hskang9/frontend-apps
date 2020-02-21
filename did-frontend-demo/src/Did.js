import React, { useEffect, useState } from 'react';
import { Form, Input, Grid, Card, Statistic } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';
import { toU8a } from '@polkadot/util';

function Main (props) {
  const { api } = useSubstrate();
  const { accountPair } = props;

  // The transaction submission status
  const [status, setStatus] = useState('');

  // The currently stored value
  const [didInfo, setDidInfo] = useState('')
  const [issuerIdValue, setIssuerIdValue] = useState('');
  const [idValue, setIdValue] = useState('')
  const [publicKeyValue, setPublicKeyValue] = useState('')
  const [ownerValue, setOwnerValue] = useState('')


  useEffect(() => {
    let unsubscribe;

    api.query.did.iDs('0x10', (did) => {
      setDidInfo(did.toString());
    })
      .then(unsub => { unsubscribe = unsub; })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.did, api.query.did.iDs]);

  return (
    <Grid.Column>
      <h1>Did Issuance </h1>
      <Form>
        <Form.Field>
          <Input
            type='bytes'
            id='new_value'
            state='newValue'
            label='DID identifier'
            onChange={(_, { value }) => setIdValue(value)}
          />
          <Input
            type='bytes'
            id='new_value'
            state='newValue'
            label='Issuer DID identifier'
            onChange={(_, { value }) => setIssuerIdValue(value)}
          />
          <Input
            type='bytes'
            id='new_value'
            state='newValue'
            label='PublicKey(hexstring)'
            onChange={(_, { value }) => setPublicKeyValue(value)}
          />
          <Input
            type='text'
            id='new_value'
            state='newValue'
            label='Owner Address'
            onChange={(_, { value }) => setOwnerValue(value)}
          />
        </Form.Field>
        <Form.Field>
          <TxButton
            accountPair={accountPair}
            label='Register DID'
            setStatus={setStatus}
            type='TRANSACTION'
            attrs={{
              params: [idValue, issuerIdValue, publicKeyValue, ownerValue],
              tx: api.tx.did.register
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function Did (props) {
  const { api } = useSubstrate();
  return (api.query.did && api.query.did.iDs
    ? <Main {...props} /> : null);
}
