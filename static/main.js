(function() {
  document.getElementById('logout').addEventListener('click', function(){
    postLogout();
  });
  document.getElementById('sqlquery').addEventListener('click', function(){
    sqlinput();
  });
  document.getElementById('interSB').addEventListener('click', function(){
    sqlselect();
  });
  document.getElementById('interDB').addEventListener('click', function(){
    sqldelete();
  });
  document.getElementById('interUB').addEventListener('click', function(){
    sqlupdate();
  });
  document.getElementById('interIB').addEventListener('click', function(){
    sqlinsert();
  });
  document.getElementById('count').addEventListener('click', function(){
    sqlcount();
  });
  document.getElementById('sum').addEventListener('click', function(){
    sqlsum();
  });
  document.getElementById('max').addEventListener('click', function(){
    sqlmax();
  });
  document.getElementById('min').addEventListener('click', function(){
    sqlmin();
  });
  document.getElementById('avg').addEventListener('click', function(){
    sqlavg();
  });
  document.getElementById('having').addEventListener('click', function(){
    sqlhaving();
  });
  document.getElementById('in').addEventListener('click', function(){
    sqlin();
  });
  document.getElementById('notin').addEventListener('click', function(){
    sqlnotin();
  });
  document.getElementById('exist').addEventListener('click', function(){
    sqlexist();
  });
  document.getElementById('notexist').addEventListener('click', function(){
    sqlnotexist();
  });
})();
// logout button
function postLogout() {
  fetch('/admin/logout', {
    method: 'POST',
  }).then(resp => resp.json())
  .then((resp) => {
    window.location.href = resp.redirect;
  });
}
// sql button count
function sqlin(){
  const query = "SELECT * FROM project.content WHERE paid IN (SELECT paid FROM project.page)";
  postQuery(query);
}
// sql button count
function sqlnotin(){
  const query = "SELECT * FROM project.page WHERE usid NOT IN (SELECT usid FROM project.user WHERE roleman='guess')";
  postQuery(query);
}
// sql button count
function sqlexist(){
  const query = "SELECT * FROM project.user u WHERE EXISTS (SELECT * FROM project.level l WHERE u.usid=l.usid AND l.ltype!='free  ')";
  postQuery(query);
}
// sql button count
function sqlnotexist(){
  const query = "SELECT * FROM project.user u WHERE NOT EXISTS (SELECT * FROM project.level l WHERE u.usid=l.usid AND l.ltype!='free  ')";
  postQuery(query);
}
// sql button count
function sqlcount(){
  const query = "SELECT COUNT(usid) FROM project.user WHERE roleman='guess'";
  postQuery(query);
}
// sql button sum
function sqlsum(){
  const query = "SELECT SUM(coin) FROM project.user WHERE roleman='guess'";
  postQuery(query);
}
// sql button max
function sqlmax(){
  const query = "SELECT * FROM project.user u WHERE u.coin = (SELECT MAX(coin) FROM project.user WHERE roleman='guess') AND roleman='guess';";
  postQuery(query);
}
// sql button min
function sqlmin(){
  const query = "SELECT * FROM project.user u WHERE u.coin=(SELECT MIN(coin) FROM project.user WHERE roleman='guess') AND roleman='guess';";
  postQuery(query);
}
// sql button avg
function sqlavg(){
  const query = "SELECT AVG(coin) FROM project.user WHERE roleman='guess';";
  postQuery(query);
}
// sql button having
function sqlhaving(){
  const query = "SELECT d.usid,d.uname,d.frid,u.uname AS fname FROM (SELECT project.user.usid,uname,frid FROM project.user INNER JOIN project.friend on project.user.usid=project.friend.usid) d INNER JOIN project.user u ON d.frid=u.usid";
  postQuery(query);
}
// sql input
function sqlinput(){
  const querytext = document.getElementById('textquery').value;
  postQuery(querytext);
}
// sql select
function sqlselect(){
  const inattr = document.getElementById('interSA').value;
  const intable = document.getElementById('interST').value;
  const inwhere = document.getElementById('interSW').value;
  if(inattr==''||intable==''){
    let dataframe = document.getElementById('dataframe');
    let p = document.createElement('p');
    p.className = 'datalogout-fail datalogout';
    p.style = 'padding:10px 0px 10px 10px';
    p.appendChild(document.createTextNode('Some Field is Empty'));
    dataframe.appendChild(p);
    return;
  } else {
    let query = `SELECT ${inattr} FROM ${intable} ${(inwhere!='')?`WHERE ${inwhere}`:''}`;
    postQuery(query);
  }
}
// sql delete
function sqldelete(){
  const intable = document.getElementById('interDT').value;
  const inwhere = document.getElementById('interDW').value;
  if(intable==''){
    let dataframe = document.getElementById('dataframe');
    let p = document.createElement('p');
    p.className = 'datalogout-fail datalogout';
    p.style = 'padding:10px 0px 10px 10px';
    p.appendChild(document.createTextNode('Some Field is Empty'));
    dataframe.appendChild(p);
    return;
  } else {
    let query = `DELETE FROM ${intable} ${(inwhere!='')?`WHERE ${inwhere}`:''}`;
    postQuery(query);
  }
}
// sql update
function sqlupdate(){
  const invalue = document.getElementById('interUV').value;
  const intable = document.getElementById('interUT').value;
  const inwhere = document.getElementById('interUW').value;
  if(invalue==''||intable==''){
    let dataframe = document.getElementById('dataframe');
    let p = document.createElement('p');
    p.className = 'datalogout-fail datalogout';
    p.style = 'padding:10px 0px 10px 10px';
    p.appendChild(document.createTextNode('Some Field is Empty'));
    dataframe.appendChild(p);
    return;
  } else {
    let query = `UPDATE ${intable} SET ${invalue} ${(inwhere!='')?`WHERE ${inwhere}`:''}`;
    postQuery(query);
  }
}
// sql insert
function sqlinsert(){
  const intable = document.getElementById('interIT').value;
  const invalue = document.getElementById('interIV').value;
  if(intable==''){
    let dataframe = document.getElementById('dataframe');
    let p = document.createElement('p');
    p.className = 'datalogout-fail datalogout';
    p.style = 'padding:10px 0px 10px 10px';
    p.appendChild(document.createTextNode('Some Field is Empty'));
    dataframe.appendChild(p);
    return;
  } else {
    let query = `INSERT INTO ${intable} VALUES ${invalue}`;
    postQuery(query);
  }
}

// utils
function postQuery(querytext) {
  fetch('/api/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `sql=${querytext}`,
  }).then(resp => resp.json())
  .then((resp) => {
    let dataframe = document.getElementById('dataframe');
    while(!!dataframe.lastElementChild){
      dataframe.removeChild(dataframe.lastElementChild);
    }
    if(!resp.error){
      console.log(resp);
      if(resp.data.length==0) {
        let p = document.createElement('p');
        p.className = 'datalogout-success datalogout';
        p.style = 'padding:10px 0px 10px 10px';
        p.appendChild(document.createTextNode('query success'));
        dataframe.appendChild(p);
        return;
      }
      let attr = Object.keys(resp.data[0]);
      resp.data.forEach(element => {
        // p element
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(`[Data]-${resp.data.indexOf(element)+1}`));
        // ul element
        let ul = document.createElement('ul');
        ul.className = 'datalogout-success datalogout';
        ul.appendChild(p);
        attr.forEach(a => {
          let logstr = a+' : '+element[a];
          let node = document.createElement('li');
          let child = document.createTextNode(logstr);
          node.appendChild(child);
          ul.appendChild(node);
        });
        dataframe.appendChild(ul);
      });
    } else {
      let p = document.createElement('p');
      p.className = 'datalogout-fail datalogout';
      p.style = 'padding:10px 0px 10px 10px';
      p.appendChild(document.createTextNode('Syntax Error'));
      dataframe.appendChild(p);
    }
  })
}
