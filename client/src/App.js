import React from 'react'
import logo from './logo.svg'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom'
import { Container, Center, Image } from '@chakra-ui/react'
import CreateUrl from './pages/CreateUrl'
import Redirection from './pages/Redirection'
import NotFound from './pages/NotFound'

function App() {
    return (
        <Router>
            <Container maxW="container.sm" padding="10">
                <Center>
                    <Link to="/">
                        <Image src={logo} className="App-logo" alt="logo" />
                    </Link>
                </Center>
                <Switch>
                    <Route path="/" exact>
                        <CreateUrl />
                    </Route>
                    <Route path="/404">
                        <NotFound />
                    </Route>
                    <Route path="/:hash" exact>
                        <Redirection />
                    </Route>
                    <Redirect to="/404" />
                </Switch>
            </Container>
        </Router>
    )
}

export default App
