import React, {useEffect} from "react";

// libs
import PixelStreaming, { usePS, DebugData } from 'pixel-streaming'

export default function Player(props) {
    const refPixelStreaming = React.useRef(null);
    const PS = usePS();


    const handleConnection = () => {
        // refPixelStreaming.current.connector.initConnection()
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        refPixelStreaming.current.cls.initConnection({
            host: 'http://127.0.0.1',
            port: 80,
        })
    }, []);

    const handleResize = () => {
        console.log('resized to ', window.innerWidth, 'x', window.innerHeight)

        const width = window.innerWidth
        const height = window.innerHeight

        //const emitConsole = refPixelStreaming.current.cls.client.emitConsole
        // const emitConsole = PS.cls.client.emitConsole

        const emitConsole = (payload) => refPixelStreaming.current.cls.client.emitConsole(payload)

        emitConsole(`PixelStreaming.Capturer.UseBackBufferSize 0`)
        emitConsole(`PixelStreaming.Capturer.CaptureSize ${width}x${height}`)
        emitConsole(`r.SetRes ${width}x${height}f`)
    }

    return (
        <div>
            <button onClick={handleConnection}>Connect</button>
            <PixelStreaming
                ref={refPixelStreaming}
                onLoad={(payload) => {
                    // console.warn('loaded', payload);
                }}
                onConnect={() => {
                    // console.warn('connected');
                }}
                onRestart={() => {
                    // console.warn('onRestart');
                }}
                onError={(payload) => {
                    // console.error('error', payload);
                }}
                onClose={(payload) => {
                    // console.error('closed', payload);
                }}
                onProgress={(payload) => {
                    // console.warn('progress', payload);
                }}
                settings={{
                    volume: 1,
                    quality: 1,
                    pixelStreaming: {
                        warnTimeout: 120,
                        closeTimeout: 10,
                        lockMouse: false,
                        fakeMouseWithTouches: false,
                    }
                }}
                metaSettings={{
                    isDev: true,
                    showDevTools: true,
                    notifyCommands: true,
                    notifyCallbacks: true,
                }}
            >
                {(payload) => <div style={{ padding: 30 }}>{props.children}</div>}
            </PixelStreaming>
        </div>
    );
}