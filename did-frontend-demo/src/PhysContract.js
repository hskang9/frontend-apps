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
  const [contentIdValue, setContentIdValue] = useState('')
  const [proposerDIDValue, setProposerDIDValue] = useState('');
  const [approverDIDValue, setApproverDIDValue] = useState('')
  const [proposerDIDSignatureValue, setProposerDIDSignatureValue] = useState('')
  const [contractIdValue, setContractIdValue] = useState('')
  const [approverDIDSignatureValue, setApproverDIDSignatureValue] = useState('')

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
    <div>
      <Grid.Column>
        <h1>Physical Contract Propose</h1>
        <Form>
          <Form.Field>
            <Input
              type='bytes'
              id='new_value'
              state='newValue'
              label='Content Identifier for the contract'
              onChange={(_, { value }) => setContentIdValue(value)}
            />
            <Input
              type='bytes'
              id='new_value'
              state='newValue'
              label='Proposer DID Identifier'
              onChange={(_, { value }) => setProposerDIDValue(value)}
            />
            <Input
              type='bytes'
              id='new_value'
              state='newValue'
              label='Approver DID Identifier to sign the contract'
              onChange={(_, { value }) => setApproverDIDValue(value)}
            />
            <Input
              type='text'
              id='new_value'
              state='newValue'
              label="Proposer's DID signature from DID private key signing content id"
              onChange={(_, { value }) => setProposerDIDSignatureValue(value)}
            />
          </Form.Field>
          <Form.Field>
            <TxButton
              accountPair={accountPair}
              label='Propose Contract'
              setStatus={setStatus}
              type='TRANSACTION'
              attrs={{
                params: [contentIdValue, proposerDIDValue, approverDIDValue, proposerDIDSignatureValue],
                tx: api.tx.physContract.propose
              }}
            />
          </Form.Field>
          <div style={{ overflowWrap: 'break-word' }}>{status}</div>
        </Form>
      </Grid.Column>
      <Grid.Column>
        <h1>Physical Contract Approve</h1>
        <Form>
          <Form.Field>
            <Input
              type='bytes'
              id='new_value'
              state='newValue'
              label='Contract Id'
              onChange={(_, { value }) => setContractIdValue(value)}
            />
            <Input
              type='text'
              id='new_value'
              state='newValue'
              label="Approver's DID signature from DID private key signing contract content hash"
              onChange={(_, { value }) => setApproverDIDSignatureValue(value)}
            />
          </Form.Field>
          <Form.Field>
            <TxButton
              accountPair={accountPair}
              label='Approve DID contract'
              setStatus={setStatus}
              type='TRANSACTION'
              attrs={{
                params: [contractIdValue, approverDIDSignatureValue],
                tx: api.tx.physContract.approve
              }}
            />
          </Form.Field>
          <div style={{ overflowWrap: 'break-word' }}>{status}</div>
        </Form>
      </Grid.Column>
    </div>
  );
}

export default function PhysContract (props) {
  const { api } = useSubstrate();
  return (api.query.did && api.query.did.iDs
    ? <Main {...props} /> : null);
}
