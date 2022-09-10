<template>
  <div id="app">
    <h1 class="text-3xl font-bold mb-4">Todo List:</h1>
    <div class="flex justify-between mb-4">
      <div class="w-10/12">
        <input class="form-control
        block       px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none w-full" v-model="description" type="text" placeholder="Go to mars..." />
      </div>
      <div class="control justify-self-end">
        <a class="inline-block px-6 py-2.5 bg-slate-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-500 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" @click="addItem" :disabled="!description">Add</a>
      </div>
    </div>
    <div class="todos" v-for="(item, i) in items" :key="item._id">
      <div class="columns flex mb-2 justify-between items-center bg-purple-200 p-2 rounded">
        <input class="form-control
        block
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none w-3/4" v-if="isSelected(item)" v-model="editedDescription" />
        <p v-else class="column text-xl ml-2">
          <span class="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-orange-200 text-slate-500 rounded">{{ i + 1}}</span>
          {{ item.description }}
        </p>
        <div class="">
          <span
            class="inline-block px-3 py-1 bg-green-500 mx-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
            @click="isSelected(item) ?  unselect() : select(item)"
          >
            <i class="material-icons">{{isSelected(item) ? 'close': 'edit'}}</i>
          </span>

          <span
            class="inline-block px-3 py-1 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-500 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
            :class="{'bg-sky-500 hover:bg-sky-500 focus:bg-sky-700 active:bg-sky-800':isSelected(item)}"
            @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)"
          >
            <i class="material-icons">{{isSelected(item) ? 'save': 'delete'}}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from "axios";
  export default {
    name: "App",
    data() {
      return {
        items: [],
        description: "",
        editedDescription: "",
        selected: {}
      };
    },
    async mounted() {
      const response = await axios.get("api/bucketListItems/");
      this.items = response.data;
    },
    methods: {
      async addItem() {
        const response = await axios.post("api/bucketListItems/", {
          description: this.description
        });
        this.items.push(response.data);
        this.description = "";
      },
      async removeItem(item, i) {
        await axios.delete("api/bucketListItems/" + item._id);
        this.items.splice(i, 1);
      },
      select(item) {
        this.selected = item;
        this.editedDescription = item.description;
      },
      isSelected(item) {
        return item._id === this.selected._id;
      },
      unselect() {
        this.selected = {};
        this.editedDescription = "";
      },
      async updateItem(item, i) {
        const response = await axios.put("api/bucketListItems/" + item._id, {
          description: this.editedDescription
        });
        this.items[i] = response.data;
        this.unselect();
      }
    }
  };
  </script>

<style>
  #app {
    margin: auto;
    margin-top: 3rem;
    max-width: 700px;
  }
  .icon {
    cursor: pointer;
  }
  </style>