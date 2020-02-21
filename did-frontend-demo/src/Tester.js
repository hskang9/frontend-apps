import React, { useEffect, useState } from 'react';
import { Form, Input, Grid, Card, Statistic, Button, Label } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';
import { toU8a } from '@polkadot/util';

function Main (props) {
  const { api } = useSubstrate();
  const { accountPair } = props;

  // The transaction submission status
  const [status, setStatus] = useState('');

  // The currently stored value

  return (
    <Grid.Column>
      <h1>How to test this</h1>
      <h2>Here are the test case to execute</h2>
      <h3>Proposer</h3>
      <p>Content id: 0x738339257c434e866dd085ff543b20de</p>
      <p>DID hash: 'fd181f2054a21296d21a42e4fe1cb7e6dd47d11c314e56777da46d844e43df90'</p>
      <p>DID private key:  new Buffer('be8ea31ae21f6388b43daf0fece5a85355acdeab6a31264f24a435f2d1a7cabf', 'hex') </p>
      <p>DID public key: new Buffer('04fc8cc6f5dfe4211d8808018d0437487eb0b1ebc4cafbd152d3fbec8edccd48fc6a3eb8cac7fa86893efbf3f2e15c5e95610fd3c5ed78031785ac7b8f567cdf6a', 'hex')</p>
      <p>DID Signature: new Buffer('304402201ff087fa0d7c9f672274fd3c5013244204a9780cfb6077e36ab4b8db9fa1d85502205801822cf5ca2fcd58f25c1f297899ea8ccdfd418c3fb38db9bfb23400b92653', 'hex')</p>
      <p>
          {`var proposer = new Object({
  public_key: new Buffer('04fc8cc6f5dfe4211d8808018d0437487eb0b1ebc4cafbd152d3fbec8edccd48fc6a3eb8cac7fa86893efbf3f2e15c5e95610fd3c5ed78031785ac7b8f567cdf6a', 'hex'),
  signature: new Buffer('304402201ff087fa0d7c9f672274fd3c5013244204a9780cfb6077e36ab4b8db9fa1d85502205801822cf5ca2fcd58f25c1f297899ea8ccdfd418c3fb38db9bfb23400b92653', 'hex')
})`}
      </p>
      <h3>Approver</h3>
      <p>DID hash: 'a003497c8891a4d3d053eeeeee252123e4b0498329353d17a79a55086b4859b4'</p>
      <p>DID private key:  new Buffer('e3046d3ec8ac1440716513e920cda272566e613c4db0a8ba0a95df93be54726c', 'hex') </p>
      <p>DID public key: new Buffer('04693c98153ca0d3e092460d2016d564f6296427809d24de222584260f4b141bd99414d7120151771f216c0b27214da17f8f6034b8f76d3aefd6d01aa49006c319', 'hex')</p>
      <p>DID Signature: new Buffer('3045022100ccc61a260a17a130c11fc968a312a84543dda48475db2ab85fa44f8308c44069022063ba6ef058a2e3d31603551c47cc9ff2af6b04d054b0c6020e404fd06fec8da0'. 'hex')</p>
      <p>{`var approver = new Object({
 public_key: new Buffer('04693c98153ca0d3e092460d2016d564f6296427809d24de222584260f4b141bd99414d7120151771f216c0b27214da17f8f6034b8f76d3aefd6d01aa49006c319', 'hex'),
 signature: new Buffer('3045022100ccc61a260a17a130c11fc968a312a84543dda48475db2ab85fa44f8308c44069022063ba6ef058a2e3d31603551c47cc9ff2af6b04d054b0c6020e404fd06fec8da0', 'hex')
 })`}</p>
      <h2>1. Make did each with given hash with issuer '0x00'</h2>
      <h2>2. Choose proposer and make a physContract with content id generated from contract editor</h2>
      <h2>3. Approve the contract from the generate contract id in event with approver did</h2>
      <h2>4. Use verifier to get contract and verify signatures</h2>
    </Grid.Column>
  );
}

export default function Verifier (props) {
  const { api } = useSubstrate();
  return (api.query.did && api.query.did.iDs
    ? <Main {...props} /> : null);
}
