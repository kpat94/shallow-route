# Shallow Route Challenge

This project sets out the template for a code challenge.

The code challenge requires you to complete the React interactions with the
concept of shallow routes.

Shallow route is one of the best practices when implementing HTTP endpoints,
although the concept is applicable to many other types of endpoint as well.

**Shallow routes never nest routes more than one level.  It takes the advantage
of resource IDs being globally unique.**

In a React application, we need to make sure that the parent portion of the
screen doesn't refresh when we are browsing the siblings.

Let's say we have a data structure to model manufacturing operations.

* There are many operations.
* An operation can have many routes.
* A route can have many segments.

```
+------------+    +--------+    +----------+
|            |   /|        |   /|          |
| Operations +--<-+ Routes +--<-+ Segments |
|            |   \|        |   \|          |
+------------+    +--------+    +----------+
```


✅ Here are some sample shallow routes.

```
/operations/1
/segments/6
/routes/8
```

**Important**

As mentioned above,

* When we are browsing between 2 segments of the same route, the route portion
  of the screen should remain the same without refreshing. 
* When we are browsing between 2 routes of the same operation, the operation
  portion of the screen should remain the same without refreshing. 

💥 Here are some sample routes not being shallow.

```
/operations/1/routes/8/segments/6
/operations/2/routes/9
```

## Running this project

You will need `yarn` and `nvm`.

To run the project, please refer to the `scripts` section of `package.json`.

Generally you will do the following and visit `http://localhost:3000/`.

```
$ bin/yarn --frozen-lockfile
$ bin/yarn run start
```
## Hints

You will need to have a good understanding of React in order to complete this
code challenge; particularly around the areas of component life cycle, virtual
DOM, conditional rendering and hooks.

You will need to change the following files so that the routing will behave as
the description above.  Please follow the hints in the comments of the files.

```
src/panels/RoutePanel.tsx
src/panels/OperationPanel.tsx
src/panels/SegmentPanel.tsx
src/ShallowRoutes.tsx
```

It is not recommended that you change files other than the one hinted, unless
you are proposing a better architecture that can deliver the same result.

The routing part is all done.  Your task is to make each page load data
correctly.

The `route` level is the most complete one and is there for you as hints for
implementing the `operation` level and the `segment` level.

The `mock` data need to be replaced by the data returned from the data access
functions in `models.ts`.
# shallow-route
