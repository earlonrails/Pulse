require 'faye'
require 'eventmachine'
  # data = { coords : { latitude : 20, longitude : 20 }, content : "some heading or something" }
# Thred.new do
  EM.run do
    client = Faye::Client.new('http://localhost:8000/faye')
    100.times do
      client.publish('/data/lololol', 'data' => { 'coords' => { 'latitude' => rand(90), 'longitude' => -(rand(100))}, 'content' => "Faye is cool"})
    end
    # EM.stop
  end

# end