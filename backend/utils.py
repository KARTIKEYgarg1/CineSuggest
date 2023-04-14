from flask import jsonify, request
import requests
from googlesearch import search
import requests
from bs4 import BeautifulSoup
import json
import pickle
def showRecommendations(df,arr,searchString):
  movie_id=df[df.Title==searchString].Movie_id.values[0]
  scores=list(enumerate(arr[movie_id]))
  scores=sorted(scores,key=lambda x:x[1],reverse=True)
  #top 4 matches
  output=[]
  for j in scores[:5]:
    output.append(list(df[df.Movie_id==j[0]].Title)[0])
  return output
def showReviews(search_term):
  query = search_term+" movie reviews"
  num_results = 5
  out=[]
  for url in search(query, num_results=num_results):
      response = requests.get(url)
      soup = BeautifulSoup(response.content, "html.parser")
      reviews = soup.find_all("div", class_="review")
      for review in reviews:
          out.append(review.text)
  ncv=pickle.load(open("./sentimentAnalyser/TfidVectorizer.pkl",'rb'))
  nmodel=pickle.load(open("./sentimentAnalyser/MultinomialNB.pkl",'rb'))
  out1=[]
  for i in out:
      sen=ncv.transform([i]).toarray()
      res=nmodel.predict(sen)[0]
      out1.append(str(res))
  res = [{"review": rev, "sentiment": sent} for rev, sent in zip(out, out1)]
  json_res = json.dumps(res)
  return json_res

def get_actor_photo(actor_names):
    actor_names = actor_names.split(',')
    photo_urls = []

    for actor_name in actor_names:
        query = f'{actor_name} actor'
        google_url = f'https://www.google.com/search?q={query}&tbm=isch'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'}
        response = requests.get(google_url, headers=headers)
        soup = BeautifulSoup(response.content, 'html.parser')
        img_url = None
        for img in soup.find_all('img'):
            try:
                img_url = img['data-src']
            except KeyError:
                pass
            if img_url:
                break
        if not img_url:
          photo_urls.append({'actor_name': actor_name, 'photo_url':"No pic found"})
        else:
          photo_urls.append({'actor_name': actor_name, 'photo_url': img_url})
    return jsonify(photo_urls)
def getMoviesFromApi(ids_list):
  results=[]
  apikey="a82cd383"
  for imdb_id in ids_list:
    url = f'http://www.omdbapi.com/?i={imdb_id}&apikey={apikey}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        results.append(data)
  return jsonify(results)