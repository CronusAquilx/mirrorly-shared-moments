import SwiftUI

struct ContentView: View {
    @State private var roomCode: String = ""
    @State private var status: String = "Disconnected"
    @State private var isConnected: Bool = false

    var body: some View {
        VStack(spacing: 30) {
            Text("Mirrorly Agent")
                .font(.largeTitle)
                .fontWeight(.bold)

            Text("Enter the room code from the web viewer")
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)

            TextField("Room Code", text: $roomCode)
                .textFieldStyle(.roundedBorder)
                .font(.title2)
                .multilineTextAlignment(.center)
                .textInputAutocapitalization(.characters)
                .padding(.horizontal, 40)

            Button(action: connect) {
                Text(isConnected ? "Disconnect" : "Connect")
                    .fontWeight(.semibold)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(isConnected ? Color.red : Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(12)
            }
            .padding(.horizontal, 40)

            Text(status)
                .foregroundColor(isConnected ? .green : .secondary)

            Spacer()

            Text("Keep this app open while controlling")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding()
    }

    func connect() {
        if isConnected {
            // TODO: Disconnect WebRTC / socket
            isConnected = false
            status = "Disconnected"
        } else {
            guard roomCode.count >= 4 else { return }
            // TODO: Connect to signaling server + start screen capture
            isConnected = true
            status = "Connecting to room \(roomCode.uppercased())..."
            // Simulate connection for now
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                status = "Connected – Streaming"
            }
        }
    }
}

#Preview {
    ContentView()
}
