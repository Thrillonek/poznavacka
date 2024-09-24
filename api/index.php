<?php
  $method = $_SERVER['REQUEST_METHOD'];
  if($method == 'GET') {
    if(isset($_SESSION) && isset($_SESSION['poznavacka'])) {
      http_response_code(200);
      echo json_encode(array('session'=>$SESSION['poznavacka']));
    } else {
      http_response_code(404);
      echo json_encode(array('error'=>'No data available in session.'));
    }
  }
  if($method == 'POST') {
    session_set_cookie_params(1000*60*60*24*30);
    session_start();
    $post = json_decode(file_get_contents('php://input'), true);
    if(isset($post['poznavacka'])) {
      $_SESSION['poznavacka'] = $post['poznavacka'];
      http_response_code(200);
    } else {
      http_response_code(400);
      echo json_encode(array('error'=>'Not enough information provided.'));
    }
  }
?>