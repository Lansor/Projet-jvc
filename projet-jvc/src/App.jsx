const Router = () => {



  return (
    <BrowserRouter>
      <div className="container">
        
        <Routes>
           
            <Route path="/auth">
              <Route path="sign-up" element={<SignUp />} />
              <Route path="sign-in" element={<SignIn />} />
            </Route>

          <Route path ="/games">
            <Route path="/" element={<GamesList />} />
            <Route path="/create" element={<GameCreate />} />
            <Route path="/edit/:id" element={<GameEdit />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/games" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
