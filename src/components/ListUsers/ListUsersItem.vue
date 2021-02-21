<template>
  <li >
    {{ idx }}
    <img
        :src="avatar_url"
        class="list__avatar"
        alt="avatar">

    <span>
      <p> Login: {{ JSON.stringify(login) }} </p>
      <p> Status: {{ JSON.stringify(type )}} </p>
    </span>
  </li>
</template>

<script>
export default {
  name: 'ListUsersItem',
  props: ['avatar_url', 'login', 'type', 'idx']
}
</script>