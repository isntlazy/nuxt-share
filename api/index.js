const express = require('express')

const mockedParagraphs = [
  { id: 1, content: 'Lorem <span id="test">ipsum</span> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur purus ut faucibus pulvinar. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. At risus viverra adipiscing at in tellus. Fusce ut placerat orci nulla pellentesque. Nibh nisl condimentum id venenatis. Vitae congue mauris rhoncus aenean vel elit. Nisi lacus sed viverra tellus in hac habitasse platea. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Eros in cursus turpis massa tincidunt dui ut ornare lectus.' },
  { id: 2, content: 'Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Ac turpis egestas integer eget aliquet nibh praesent. Scelerisque purus semper eget duis at tellus at urna. Eleifend mi in nulla posuere sollicitudin aliquam ultrices. Congue eu consequat ac felis donec. Neque egestas congue quisque egestas diam in. Consectetur a erat nam at lectus urna. Sodales neque sodales ut etiam sit amet. Nullam non nisi est sit amet facilisis magna. Tellus id interdum velit laoreet id. Nulla at volutpat diam ut venenatis tellus in. Augue mauris augue neque gravida in fermentum. Porttitor rhoncus dolor purus non enim. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Nisl nisi scelerisque eu ultrices vitae. Tellus integer feugiat scelerisque varius morbi. Eleifend donec pretium vulputate sapien nec.' },
  { id: 3, content: 'Ac turpis egestas sed tempus urna et pharetra. Nunc sed velit dignissim sodales ut eu. Volutpat odio facilisis mauris sit amet massa vitae tortor. Vestibulum mattis ullamcorper velit sed ullamcorper morbi. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Nisi porta lorem mollis aliquam ut porttitor. Justo donec enim diam vulputate ut pharetra. Vestibulum lorem sed risus ultricies tristique. Dictum varius duis at consectetur lorem donec massa. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Pellentesque habitant morbi tristique senectus et netus et. Sapien nec sagittis aliquam malesuada bibendum. Habitasse platea dictumst quisque sagittis. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Integer vitae justo eget magna fermentum iaculis eu non diam. Ultricies integer quis auctor elit sed vulputate. Aenean vel elit scelerisque mauris pellentesque. Elit at imperdiet dui accumsan sit amet.' },
  { id: 4, content: 'Ac turpis egestas sed tempus urna et pharetra. Nunc sed velit dignissim sodales ut eu. Volutpat odio facilisis mauris sit amet massa vitae tortor. Vestibulum mattis ullamcorper velit sed ullamcorper morbi. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Nisi porta lorem mollis aliquam ut porttitor. Justo donec enim diam vulputate ut pharetra. Vestibulum lorem sed risus ultricies tristique. Dictum varius duis at consectetur lorem donec massa. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Pellentesque habitant morbi tristique senectus et netus et. Sapien nec sagittis aliquam malesuada bibendum. Habitasse platea dictumst quisque sagittis. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Integer vitae justo eget magna fermentum iaculis eu non diam. Ultricies integer quis auctor elit sed vulputate. Aenean vel elit scelerisque mauris pellentesque. Elit at imperdiet dui accumsan sit amet.' },
  { id: 5, content: 'Ac turpis egestas sed tempus urna et pharetra. Nunc sed velit dignissim sodales ut eu. Volutpat odio facilisis mauris sit amet massa vitae tortor. Vestibulum mattis ullamcorper velit sed ullamcorper morbi. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Nisi porta lorem mollis aliquam ut porttitor. Justo donec enim diam vulputate ut pharetra. Vestibulum lorem sed risus ultricies tristique. Dictum varius duis at consectetur lorem donec massa. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Pellentesque habitant morbi tristique senectus et netus et. Sapien nec sagittis aliquam malesuada bibendum. Habitasse platea dictumst quisque sagittis. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Integer vitae justo eget magna fermentum iaculis eu non diam. Ultricies integer quis auctor elit sed vulputate. Aenean vel elit scelerisque mauris pellentesque. Elit at imperdiet dui accumsan sit amet.' },
  { id: 6, content: 'Ac turpis egestas sed tempus urna et pharetra. Nunc sed velit dignissim sodales ut eu. Volutpat odio facilisis mauris sit amet massa vitae tortor. Vestibulum mattis ullamcorper velit sed ullamcorper morbi. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Nisi porta lorem mollis aliquam ut porttitor. Justo donec enim diam vulputate ut pharetra. Vestibulum lorem sed risus ultricies tristique. Dictum varius duis at consectetur lorem donec massa. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Pellentesque habitant morbi tristique senectus et netus et. Sapien nec sagittis aliquam malesuada bibendum. Habitasse platea dictumst quisque sagittis. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Integer vitae justo eget magna fermentum iaculis eu non diam. Ultricies integer quis auctor elit sed vulputate. Aenean vel elit scelerisque mauris pellentesque. Elit at imperdiet dui accumsan sit amet.' }
];

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/data', function (req, res) {
  res.send({ mockedParagraphs })
})

app.post('/updateParagraph', function (req, res) {
  const { id, content } = req.body;
  mockedParagraphs.find(p => p.id === Number(id)).content = content;
  res.send({ mockedParagraphs })
})


export default {
  path: '/api',
  handler: app
}
