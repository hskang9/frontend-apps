import React, { useEffect, useState } from 'react';
import { Form, Input, Grid, Card, Statistic, Button, Label } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';
import { toU8a } from '@polkadot/util';
import { eccrypto } from 'eccrypto';

function Main (props) {
  const { api } = useSubstrate();
  const { accountPair } = props;

  // The transaction submission status
  const [status, setStatus] = useState('');

  // The currently stored value
  const [proposerDIDValue, setProposerDIDValue] = useState('');
  const [approverDIDValue, setApproverDIDValue] = useState('');
  const [get, setGet] = useState(false);
  const [proposerGet, setProposerGet] = useState(false);
  const [approverGet, setApproverGet] = useState(false);
  const [proposerDIDPublickeyValue, setProposerDIDPublickeyValue] = useState('');
  const [approverDIDPublickeyValue, setApproverDIDPublickeyValue] = useState('');
  const [proposerDIDSignatureValue, setProposerDIDSignatureValue] = useState('');
  const [approverDIDSignatureValue, setApproverDIDSignatureValue] = useState('');
  const [contractValue, setContractValue] = useState('');
  const [contractIdValue, setContractIdValue] = useState('');
  const [contentIdValue, setContentIdValue] = useState('');
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    let unsubscribe;

    if (verify) {
      var eccrypto = require('eccrypto');

      const msg = Buffer.from(contentIdValue.slice(2), 'hex');
      const proposer = {
        public_key: Buffer.from(proposerDIDPublickeyValue.slice(2), 'hex'),
        signature: Buffer.from(proposerDIDSignatureValue.slice(2), 'hex')
      };

      const approver = {
        public_key: Buffer.from(approverDIDPublickeyValue.slice(2), 'hex'),
        signature: Buffer.from(approverDIDSignatureValue.slice(2), 'hex')
      };

      eccrypto.verify(proposer.public_key, msg, proposer.signature).then((proposerValid) => {

        if (proposerValid == null) {
          eccrypto.verify(approver.public_key, msg, approver.signature).then((approverValid) => {
            if (approverValid == null) {
              alert('Valid contract');
            } else {
              alert('Invalid approver signature');
            }
          });
        } else {
          alert('Invalid proposer signature');
        }
      });
      setVerify(false);
    }
    if (approverGet) {
      api.query.did.iDs(approverDIDValue, (pub) => {
        setApproverDIDPublickeyValue(pub.public_key.toString());
      })
        .then(unsub => { unsubscribe = unsub; })
        .catch(console.error);
      setApproverGet(false);
    }
    if (proposerGet) {
      api.query.did.iDs(proposerDIDValue, (pub) => {
        setProposerDIDPublickeyValue(pub.public_key.toString());
      })
        .then(unsub => { unsubscribe = unsub; })
        .catch(console.error);
      setProposerGet(false);
    }
    if (get) {
      api.query.physContract.physContracts(contractIdValue, (contract) => {
        setContractValue(contract.toString());
        setContentIdValue(contract.content_id.toString());
        setProposerDIDValue(contract.proposer_id.toString());
        setApproverDIDValue(contract.approver_id.toString());
        setProposerDIDSignatureValue(contract.proposer_signature.toString());
        setApproverDIDSignatureValue(contract.approver_signature.toString());
        setProposerGet(true);
        setApproverGet(true);
      })
        .then(unsub => { unsubscribe = unsub; })
        .catch(console.error);
      setGet(false);
      setProposerGet(false);
      setApproverGet(false);
    }

    return () => unsubscribe && unsubscribe();
  }, [get, api.query.did, api.query.did.iDs, api.query.physContract, api.query.physContract.physContracts, proposerDIDValue, approverDIDValue, contractIdValue, verify, approverGet, proposerGet, contentIdValue, proposerDIDPublickeyValue, approverDIDPublickeyValue, proposerDIDSignatureValue, approverDIDSignatureValue, contractValue.content_id]);

  return (
    <Grid.Column>
      <h1>Contract Verifier</h1>
      <Form>
        <Form.Field>
          <Input
            type='text'
            id='new_value'
            state='newValue'
            label='Contract ID'
            onChange={(_, { value }) => { setContractIdValue(value); setGet(true); }}
          />
          <Label>{'contract: ' + contractValue}</Label>
          <Input
            type='text'
            id='new_value'
            state='newValue'
            label='Proposer DID'
            value={proposerDIDValue}
            onChange={(_, { value }) => { setProposerDIDValue(value); setProposerGet(true); }}
          />
          <Label>{'public_key: ' + proposerDIDPublickeyValue}</Label>
          <Input
            type='text'
            id='new_value'
            state='newValue'
            label='Approver DID'
            value={approverDIDValue}
            onChange={(_, { value }) => { setApproverDIDValue(value); setApproverGet(true); }}
          />
          <Label>{'public_key: ' + approverDIDPublickeyValue}</Label>
          <Input
            type='bytes'
            id='new_value'
            state='newValue'
            label='Proposer DID signature'
            value={proposerDIDSignatureValue}
            onChange={(_, { value }) => setProposerDIDSignatureValue(value)}
          />
          <Input
            type='text'
            id='new_value'
            state='newValue'
            label='Approver DID signature'
            value={approverDIDSignatureValue}
            onChange={(_, { value }) => setApproverDIDSignatureValue(value)}
          />
        </Form.Field>
        <Form.Field>

        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
      <Button
        primary
        style={null}
        onClick={() => setVerify(true)}
      >
            Verify Contract
      </Button>
    </Grid.Column>
  );
}

export default function Verifier (props) {
  const { api } = useSubstrate();
  return (api.query.did && api.query.did.iDs
    ? <Main {...props} /> : null);
}
