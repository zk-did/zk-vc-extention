window.addEventListener('message', async function(event) {
    if (event.data.type === 'init') {
        const { circuitWasm, zkey, vkey } = event.data;
        try {
            const circuitWasmBuffer = new Uint8Array(circuitWasm);
            const zkeyBuffer = new Uint8Array(zkey);
            const { proof, publicSignals } = await snarkjs.groth16.fullProve({ a: 3, b: 11 }, circuitWasmBuffer, zkeyBuffer);
            const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);

            window.parent.postMessage({
                type: 'proofResult',
                proof: proof,
                verificationResult: res
            }, '*');
        } catch (error) {
            window.parent.postMessage({
                type: 'proofResult',
                error: error.message
            }, '*');
        }
    }
});
