

import { ApiPromise, WsProvider } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto';

export async function connect() {

    const docktype = {
        "Did": '[u8;32]',
        "Bytes32": {
          "value": "[u8;32]"
        },
        "Bytes33": {
          "value": "[u8;33]"
        },
        "Bytes64": {
          "value": "[u8;64]"
        },
        "Bytes65": {
          "value": "[u8;65]"
        },
        "PublicKey": {
          "_enum": {
            "Sr25519": "Bytes32",
            "Ed25519": "Bytes32",
            "Secp256k1": "Bytes33"
          }
        },
        "DidSignature": {
          "_enum": {
            "Sr25519": "Bytes64",
            "Ed25519": "Bytes64",
            "Secp256k1": "Bytes65"
          }
        },
        "KeyDetail": {
          "controller": "Did",
          "public_key": "PublicKey"
        },
        "KeyUpdate": {
          "did": "Did",
          "public_key": "PublicKey",
          "controller": "Option<Did>",
          "last_modified_in_block": "BlockNumber"
        },
        "DidRemoval": {
          "did": "Did",
          "last_modified_in_block": "BlockNumber"
        },
        "RegistryId": "[u8;32]",
        "RevokeId": "[u8;32]",
        "Registry": {
          "policy": "Policy",
          "add_only": "bool"
        },
        "Revoke": {
          "registry_id": "RegistryId",
          "revoke_ids": "BTreeSet<RevokeId>",
          "last_modified": "BlockNumber"
        },
        "UnRevoke": {
          "registry_id": "RegistryId",
          "revoke_ids": "BTreeSet<RevokeId>",
          "last_modified": "BlockNumber"
        },
        "RemoveRegistry": {
          "registry_id": "RegistryId",
          "last_modified": "BlockNumber"
        },
        "PAuth": "BTreeMap<Did, DidSignature>",
        "Policy": {
          "_enum": {
            "OneOf": "BTreeSet<Did>"
          }
        },
        "BlobId": "[u8;32]",
        "Blob": {
          "id": "BlobId",
          "blob": "Vec<u8>",
          "author": "Did"
        },
        "StateChange": {
          "_enum": {
            "KeyUpdate": "KeyUpdate",
            "DidRemoval": "DidRemoval",
            "Revoke": "Revoke",
            "UnRevoke": "UnRevoke",
            "RemoveRegistry": "RemoveRegistry",
            "Blob": "Blob"
          }
        },
        "Address": "AccountId",

      }

    //const provider = new WsProvider('ws://127.0.0.1:9944');
    const provider = new WsProvider('wss://poc-3.polkadot.io');    
    
    // wasm loaded here and is where the error happens. without
    // WebAssembly, the code after will not work correctly.
    await cryptoWaitReady();

    const api = await ApiPromise.create({provider,types : docktype})
    //Retrieve the chain & node information information via rpc calls
    const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
    ]);

    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);


}