document.addEventListener('DOMContentLoaded', function() {
    const proofComponent = document.getElementById('proof');
    const resultComponent = document.getElementById('result');
    const publicSignalsComponent = document.getElementById('publicSignals');
    const calldataComponent = document.getElementById('calldata');
    const bGenProof = document.getElementById("bGenProof");

    bGenProof.addEventListener("click", calculateProof);

    async function calculateProof() {
        const sandbox = document.createElement('iframe');
        sandbox.style.display = 'none';
        sandbox.src = chrome.runtime.getURL('sandbox.html');
        sandbox.sandbox = 'allow-scripts';

        // 로그를 표시할 HTML 요소 추가
        const logElement = document.getElementById("log");

        // 파일을 읽어오는 함수
        async function loadFiles() {
            try {
                const circuitWasmUrl = chrome.runtime.getURL("circuit.wasm");
                const zkeyUrl = chrome.runtime.getURL("circuit_final.zkey");
                const vkeyUrl = chrome.runtime.getURL("verification_key.json");

                const circuitWasmResponse = await fetch(circuitWasmUrl);
                logElement.textContent += "Successfully fetched circuit.wasm file.\n";

                const zkeyResponse = await fetch(zkeyUrl);
                logElement.textContent += "Successfully fetched circuit_final.zkey file.\n";

                const vkeyResponse = await fetch(vkeyUrl);
                logElement.textContent += "Successfully fetched verification_key.json file.\n";

                const circuitWasm = await circuitWasmResponse.arrayBuffer();
                const zkey = await zkeyResponse.arrayBuffer();
                const vkey = await vkeyResponse.json();

                return { circuitWasm, zkey, vkey };
            } catch (error) {
                logElement.textContent += "Error occurred while fetching files: " + error.message + "\n"; // 오류 로그 추가
                return { circuitWasm: null, zkey: null, vkey: null }; // 항상 객체 반환
            }
        }

        // 메시지 핸들러
        window.addEventListener('message', function handler(event) {
            if (event.source !== sandbox.contentWindow) return;

            if (event.data.type === 'proofResult') {
                if (event.data.error) {
                    resultComponent.textContent = `Error: ${event.data.error}`;
                } else {
                    proofComponent.textContent = JSON.stringify(event.data.proof, null, 2);
                    publicSignalsComponent.textContent = JSON.stringify(event.data.publicSignals, null, 2);
                    calldataComponent.textContent = JSON.stringify(event.data.calldata, null, 2);
                    resultComponent.textContent = event.data.verificationResult ? "Proof is valid" : "Proof is invalid";
                }
                window.removeEventListener('message', handler);
                document.body.removeChild(sandbox);
            }
        });

        document.body.appendChild(sandbox);

        // 샌드박스 iframe이 로드되면 메시지를 보냄
        sandbox.addEventListener('load', function() {
            loadFiles().then(({ circuitWasm, zkey, vkey }) => {
                if (circuitWasm && zkey && vkey) {
                    sandbox.contentWindow.postMessage({
                        type: 'init',
                        circuitWasm: circuitWasm,
                        zkey: zkey,
                        vkey: vkey 
                    }, '*');
                } else {
                    logElement.textContent += "Failed to load files.\n";
                }
            });
        });
    }
});
