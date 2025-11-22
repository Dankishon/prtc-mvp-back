# Safe Anonymization Mail Module Circuits

This repository contains the circuit part of the PRTC project.

## Dependencies

The circuits are written in Noir and use the Barretenberg proving library. To work correctly, the following versions are required:
- Noir v0.35.0
- BB v0.57.0

### Install the required version of Noir
1. Open a terminal on your machine, and write:
    ```
        curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash
    ```
2. Close the terminal, open another one, and run:
    ```
        noirup -v v0.35.0
    ```
Done. That's it. You should have the latest version working. You can check with `nargo --version`.

### Install the required version of Barretenberg (BB)
1. Install bbup the installation script by running this in your terminal:
    ```
        curl -L https://raw.githubusercontent.com/AztecProtocol/aztec-packages/master/barretenberg/cpp/installation/install | bash
    ```
2. Reload your terminal shell environment.
3. Install the version of bb compatible with your Noir version:
    ```
        bbup -v 0.57.0
    ```
4. Check if the installation was successful:
    ```
        bb --version
    ```

## Compilation

To compile a nargo project:
```
  nargo compile
```

## Generate/verify proof

1. Generate a witness for your Noir program by running:
    ```
        nargo execute witness-PRTC
    ```

2. Prove the valid execution of your Noir program by running:
    ```
        bb prove_ultra_honk -b ./target/PRTC.json -w ./target/witness-PRTC.gz -o ./target/proof
    ```
    For the Solidity Verifier, run:
    ```
        bb prove_ultra_keccak_honk -b ./target/PRTC.json -w ./target/witness-PRTC.gz -o ./target/proofSol
    ```

3. Compute the verification key for your Noir program by running:
    ```
        bb write_vk_ultra_honk -b ./target/PRTC.json -o ./target/vk
    ```

4. Verify your proof by running:
    ```
        bb verify_ultra_honk -k ./target/vk -p ./target/proof
    ```
    If successful, the verification will complete silently; if unsuccessful, the command will trigger logging of the corresponding error.

5. Generate the Solidity Verifier contract:
    ```
        bb contract_ultra_honk -k ./target/vk -c $CRS_PATH -b ./target/PRTC.json -o ./target/VerifierPRTC.sol
    ```
