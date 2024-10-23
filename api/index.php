<?php
  ini_set('session.cookie_lifetime', 60*60*24*30);
  ini_set('session.gc_maxlifetime', 60*60*24*30);
  session_start();
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  $method = $_SERVER['REQUEST_METHOD'];
  if($method == 'GET') {
    if(isset($_COOKIE['poznavacka'])) {
      http_response_code(200);
      echo json_encode(array('session'=>$_COOKIE['poznavacka'], 'test'=>$_SESSION['poznavacka']));
    } else {
      http_response_code(404);
      echo json_encode(array('error'=>'No data available in session.'));
    }
  }
  if($method == 'POST') {
    $post = json_decode(file_get_contents('php://input'), true);
    if(isset($post['poznavacka'])) {
      setcookie('poznavacka', $post['poznavacka'], time()+(86400*30));
      $_SESSION['poznavacka'] = $post['poznavacka'];
      http_response_code(200);
    } else {
      http_response_code(400);
      echo json_encode(array('error'=>'Not enough information provided.'));
    }
  }
?>