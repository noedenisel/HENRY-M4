-------1 Buscá todas las películas filmadas en el año que naciste.
 SELECT name, year FROM movies WHERE year=1996;

-------2 Cuantas películas hay en la DB que sean del año 1982?
SELECT COUNT(name)
FROM movies
WHERE year=1982;

-------3Buscá actores que tengan el substring stack en su apellido.
SELECT * FROM actors WHERE last_name LIKE '%stack%'

SELECT COUNT(first_name) FROM actors WHERE last_name LIKE '%stack%'

-------4 Buscá los 10 nombres y apellidos más populares entre los actores. Cuantos actores tienen cada uno de esos nombres y apellidos?
SELECT first_name, last_name, COUNT() FROM actors
GROUP BY first_name, last_name
ORDER BY COUNT() DESC
LIMIT 10;

------5 Listá el top 100 de actores más activos junto con el número de roles que haya realizado.
SELECT actors.first_name,actors.last_name, COUNT(roles.actor_id) as num_roles
FROM actors
JOIN roles ON actors.id = roles.actor_id
GROUP BY actors.id
ORDER BY num_roles DESC
LIMIT 100;

------6Bottom of the Barrel Cuantas películas tiene IMDB por género? Ordená la lista por el género menos popular.

SELECT genre, COUNT(genre) as count
FROM movies_genres
GROUP BY genre
ORDER BY count ASC;

-----7Braveheart Listá el nombre y apellido de todos los actores que trabajaron en la película "Braveheart" de 1995, ordená la lista alfabéticamente por apellido.

SELECT first_name, last_name
FROM actors
JOIN roles ON actors.id = roles.actor_id
JOIN movies ON roles.movie_id = movies.id
WHERE movies.name = 'Braveheart' AND movies.year = 1995
ORDER BY last_name ASC;

-----8 Leap Noir Listá todos los directores que dirigieron una película de género 'Film-Noir' en un año bisiesto (para reducir la complejidad, asumí que cualquier año divisible por cuatro es bisiesto). Tu consulta debería devolver el nombre del director, el nombre de la peli y el año. Todo ordenado por el nombre de la película.

SELECT directors.first_name, directors.last_name, movies.name, movies.year
FROM directors
JOIN movies_directors ON directors.id = movies_directors.director_id
JOIN movies ON movies_directors.movie_id = movies.id
JOIN movies_genres ON movies.id = movies_genres.movie_id
WHERE movies_genres.genre = 'Film-Noir' AND (movies.year % 4 = 0)
ORDER BY movies.name;

----9 Bacon Listá todos los actores que hayan trabajado con Kevin Bacon en películas de Drama (incluí el título de la peli). Excluí al señor Bacon de los resultados.